using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RelacjeSportowe.Business.Interfaces.Providers;
using RelacjeSportowe.Business.Interfaces.Services;
using RelacjeSportowe.DataAccess.Data;
using RelacjeSportowe.DataAccess.Dtos;
using RelacjeSportowe.DataAccess.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RelacjeSportowe.Business.Services
{
    public class BaseService<T> : IBaseService<T> where T : class, IEntity
    {
        protected AppDbContext Context => baseUtilitiesProvider.Context;
        protected UserDto CurrentUser => baseUtilitiesProvider.CurrentUser;
        protected IMapper Mapper => baseUtilitiesProvider.Mapper;

        private readonly IBaseUtilitiesProvider baseUtilitiesProvider;

        public BaseService(IBaseUtilitiesProvider baseUtilitiesProvider)
        {
            this.baseUtilitiesProvider = baseUtilitiesProvider;
        }

        protected async Task<T> AddAsync(T entity, bool saveChanges = true)
        {
            await Context.Set<T>().AddAsync(entity);

            await HandleContextChanges(saveChanges);

            return entity;
        }

        protected async Task<IEnumerable<T>> AddRangeAsync(IEnumerable<T> entities, bool saveChanges = true)
        {
            await Context.Set<T>().AddRangeAsync(entities);

            await HandleContextChanges(saveChanges);

            return entities;
        }

        protected async Task DeleteAsync(int entityId, bool saveChanges = true)
        {
            var entity = await GetByIdAsync(entityId);

            await DeleteAsync(entity, saveChanges);
        }

        protected async Task DeleteAsync(T entity, bool saveChanges = true)
        {
            if (entity != null)
            {
                Context.Set<T>().Remove(entity);
            }

            await HandleContextChanges(saveChanges);
        }

        protected async Task DeleteRangeAsync(IEnumerable<int> entityIds, bool saveChanges = true)
        {
            var entities = GetById(entityIds);

            await DeleteRangeAsync(entities, saveChanges);
        }

        protected async Task DeleteRangeAsync(IEnumerable<T> entities, bool saveChanges = true)
        {
            if (entities != null && entities.Any())
            {
                Context.Set<T>().RemoveRange(entities);
            }

            await HandleContextChanges(saveChanges);
        }

        protected IQueryable<T> GetAll(bool noTracking = false)
        {
            return noTracking ?
                Context.Set<T>().AsNoTracking() : Context.Set<T>();
        }

        protected IEnumerable<T> GetById(IEnumerable<int> ids, bool noTracking = false)
        {
            return GetAll(noTracking)
                .Where(entity => ids.Contains(entity.Id) == true);
        }

        protected async Task<T> GetByIdAsync(int id, bool noTracking = false)
        {
            return await GetAll(noTracking)
                .FirstOrDefaultAsync(entity => entity.Id == id);
        }

        protected async Task<T> UpdateAsync(T entity, bool saveChanges = true)
        {
            var entityToUpdate = await GetByIdAsync(entity.Id);

            Context.Entry(entityToUpdate).CurrentValues.SetValues(entity);

            await HandleContextChanges(saveChanges);

            return entity;
        }

        protected async Task<IEnumerable<T>> UpdateRangeAsync(IEnumerable<T> entities, bool saveChanges = true)
        {
            var entitiesToUpdate = GetById(entities.Select(x => x.Id)).OrderBy(x => x.Id);
            var orderedEntities = entities.OrderBy(x => x.Id);

            for (int i = 0; i < entitiesToUpdate.Count(); i++)
            {
                Context.Entry(entitiesToUpdate.ElementAt(i)).CurrentValues.SetValues(orderedEntities.ElementAt(i));
            }

            await HandleContextChanges(saveChanges);

            return orderedEntities;
        }

        protected async Task SaveChanges()
        {
            await Context.SaveChangesAsync(CurrentUser);
        }

        private async Task HandleContextChanges(bool saveChanges)
        {
            if (saveChanges)
            {
                await SaveChanges();
            }
        }
    }
}
