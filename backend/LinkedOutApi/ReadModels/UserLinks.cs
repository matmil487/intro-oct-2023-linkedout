namespace LinkedOutApi.ReadModels;

public class UserLinks
{
    public Guid Id { get; set; }
    public int Version { get; set; }
    public List<UserLinkCreate> Links { get; set; } = new();
    public List<UserLinkCreate> DeletedLinks { get; set; } = new();

    public void Apply(UserLinkCreate @event)
    {
        Version++;
        Links.Add(@event);
    }

    public void Apply(UserDeletedLink @event)
    {
        Version++;

        var linkToDelete = Links.Single(l => l.Id == @event.Id);
        var newLinks = Links.Where(l => l.Id != @event.Id).ToList();
        Links = newLinks;
        DeletedLinks.Add(linkToDelete);
    }
}
