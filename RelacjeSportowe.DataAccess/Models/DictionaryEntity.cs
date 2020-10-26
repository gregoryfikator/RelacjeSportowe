using RelacjeSportowe.DataAccess.Interfaces;
using System;

namespace RelacjeSportowe.DataAccess.Models
{
    public abstract class DictionaryEntity : IDictionaryEntity
    {
        public int Id { get; set; }

        public string Value { get; set; }
    }
}
