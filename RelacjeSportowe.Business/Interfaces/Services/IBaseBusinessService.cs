using RelacjeSportowe.DataAccess.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RelacjeSportowe.Business.Interfaces.Services
{
    public interface IBaseBusinessService<T> where T : class, IEntity
    {
        Task<T> AddAsync(T entity, bool saveChanges = true);

        Task<IEnumerable<T>> AddRangeAsync(IEnumerable<T> entities, bool saveChanges = true);

        Task DeleteAsync(int entityId, bool saveChanges = true);

        Task DeleteAsync(T entity, bool saveChanges = true);

        Task DeleteRangeAsync(IEnumerable<int> entityIds, bool saveChanges = true);

        Task DeleteRangeAsync(IEnumerable<T> entities, bool saveChanges = true);

        IQueryable<T> GetAll(bool noTracking = false);

        IEnumerable<T> GetById(IEnumerable<int> ids, bool noTracking = false);

        Task<T> GetByIdAsync(int id, bool noTracking = false);

        Task<T> UpdateAsync(T entity, bool saveChanges = true);

        Task<IEnumerable<T>> UpdateRangeAsync(IEnumerable<T> entities, bool saveChanges = true);

        Task SaveChanges();
    }
}
