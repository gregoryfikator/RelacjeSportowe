using RelacjeSportowe.DataAccess.Interfaces;

namespace RelacjeSportowe.Business.Interfaces.Services
{
    public interface IBaseService<T> where T : class, IEntity
    {
    }
}
