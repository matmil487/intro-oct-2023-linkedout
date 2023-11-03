using LinkedOutApi;
using LinkedOutApi.ReadModels;
using Marten;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication().AddJwtBearer(opts =>
{
    if (builder.Environment.IsDevelopment())
    {
        opts.RequireHttpsMetadata = false;
    }
});
builder.Services.AddAuthorization();

builder.Services.AddCors(cors => // "Promiscuous Mode"
{
    cors.AddDefaultPolicy(pol =>
    {
        var origins = builder.Configuration.GetSection("allowed-origins").Get<string[]>() ?? throw new Exception("Need The Origins");
        pol.WithOrigins(origins);
        pol.AllowAnyMethod();
        pol.AllowAnyHeader();
        pol.AllowCredentials();
    });
});

var connectionString = builder.Configuration.GetConnectionString("database") ?? throw new Exception("We need a database");

builder.Services.AddMarten(options =>
{
    options.Connection(connectionString);
    options.Projections.Snapshot<UserLinks>(Marten.Events.Projections.SnapshotLifecycle.Inline);
}).UseLightweightSessions();

builder.Services.AddScoped<UserService>();
builder.Services.AddHttpContextAccessor();
var app = builder.Build();


app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapPost("/user/logins", async (UserService userService, CancellationToken token) =>
{
    await userService.LoginUserAsync(token); // feels like a command!
    return Results.Ok();
});

app.MapPost("/user/counter", async (CounterRequest request,
    IDocumentSession session,
    UserService user,
    CancellationToken token) =>
{
    var userId = await user.GetUserIdAsync(token);
    var doc = new UserCounter(userId, request.Current, request.By);
    session.Store(doc);
    await session.SaveChangesAsync(token);
    return Results.Ok(doc);
}).RequireAuthorization();

app.MapGet("/user/counter", async (IDocumentSession session, UserService user, CancellationToken token) =>
{

    var userId = await user.GetUserIdAsync(token);
    var doc = await session.Query<UserCounter>().SingleOrDefaultAsync(u => u.Id == userId);
    if (doc is null)
    {
        return Results.NotFound();
    }
    else
    {
        return Results.Ok(doc);
    }
}).RequireAuthorization();

app.MapPost("/user/links", async (
    UserLinkCreate request,
    UserService service,
    IDocumentSession session,
    CancellationToken token) =>
{
    var userId = await service.GetUserIdAsync(token);

    session.Events.Append(userId, request); // as part of this going to update that UserLinks
    await session.SaveChangesAsync(token);
    return Results.Ok(request);
}).RequireAuthorization();

app.MapGet("/user/links", async (UserService service, IDocumentSession session, CancellationToken token) =>
{
    var userId = await service.GetUserIdAsync(token);
    var response = await session.Query<UserLinks>().Where(u => u.Id == userId).SingleOrDefaultAsync();
    return Results.Ok(response);
}).RequireAuthorization();

app.MapDelete("/user/links/{id:Guid}", async (Guid Id, UserService service, IDocumentSession session, CancellationToken token) =>
{
    var userId = await service.GetUserIdAsync(token);
    session.Events.Append(userId, new UserDeletedLink(Id));
    await session.SaveChangesAsync();
    return Results.NoContent();
}).RequireAuthorization();
app.Run();


public record UserLinkCreate(Guid Id, string Href, string Description);
public record CounterRequest(int Current, int By);
public record UserCounter(Guid Id, int Current, int By);

public record UserDeletedLink(Guid Id);