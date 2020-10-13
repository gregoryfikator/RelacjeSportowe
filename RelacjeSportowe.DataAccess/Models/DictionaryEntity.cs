using RelacjeSportowe.DataAccess.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace RelacjeSportowe.DataAccess.Models
{
    public abstract class DictionaryEntity : IDictionaryEntity
    {
        [Key]
        public int Id { get; set; }

        public string Value { get; set; }
    }
}
