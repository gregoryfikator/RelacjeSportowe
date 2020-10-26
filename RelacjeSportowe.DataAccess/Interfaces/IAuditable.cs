using RelacjeSportowe.DataAccess.Models;
using System;

namespace RelacjeSportowe.DataAccess.Interfaces
{
    public interface IAuditable
    {
        int? ModifiedById { get; set; }

        User ModifiedBy { get; set; }

        DateTime? ModificationDate { get; set; }
    }
}
