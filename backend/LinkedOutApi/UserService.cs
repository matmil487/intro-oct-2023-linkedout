using Marten;
using System.Security.Claims;

namespace LinkedOutApi;

public class UserService
{
    private readonly IHttpContextAccessor _contextAccessor;
    private readonly IDocumentSession _documentSession;

    public UserService(IHttpContextAccessor contextAccessor, IDocumentSession documentSession)
    {
        _contextAccessor = contextAccessor;
        _documentSession = documentSession;
    }

    // "Command" - "Do This Thing"
    // "Query" - Asking it something.
    public async Task<Guid> GetUserIdAsync(CancellationToken token)
    {
        Claim? sub = GetUserSub();

        var user = await _documentSession.Query<User>().SingleAsync(u => u.Sub == sub.Value, token);
        return user.Id;
    }

    private Claim GetUserSub()
    {
        var sub = _contextAccessor.HttpContext?.User.Claims.SingleOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (sub is null)
        {
            throw new Exception("User Service Can only be used in authenticated endpoints");
        }

        return sub;
    }

    public async Task LoginUserAsync(CancellationToken token)
    {

        Claim? sub = GetUserSub();


        var user = await _documentSession.Query<User>().SingleOrDefaultAsync(u => u.Sub == sub.Value, token);

        if (user is null)
        {
            var newUser = new User(Guid.NewGuid(), sub.Value);
            _documentSession.Store(newUser);
            await _documentSession.SaveChangesAsync(token);

        }
    }
}

public record User(Guid Id, string Sub);
