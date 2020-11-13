using System.Collections.Generic;

namespace RelacjeSportowe.DataAccess.Models
{
    public class Role : DictionaryEntity
    {
        public virtual IEnumerable<User> Users { get; set; }
    }
}
