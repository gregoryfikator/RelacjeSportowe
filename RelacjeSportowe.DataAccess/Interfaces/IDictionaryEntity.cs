namespace RelacjeSportowe.DataAccess.Interfaces
{
    public interface IDictionaryEntity : IEntity, IAuditable
    {
        string Value { get; set; }
    }
}
