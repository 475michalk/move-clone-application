using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entity
{
   
    public class DriverDto
    {

        public int Id { get; set; }
        public string NameDriver { get; set; } //שם
        public string Status { get; set; } //סטטוס פנוי או לא בסיום הנסיעה נהג מעדכן
        public float Lat { get; set; } //מיקום
        public float Lng { get; set; }
        public string Email { get; set; } // שדה נוסף למייל
        public string Password { get; set; }
        public string PhoneNumber { get; set; } // שדה נוסף לטלפון
                                                //   public string? VerificationCode { get; set; }

        //public virtual ICollection<OrderingDto>? Orders { get; set; }

        public virtual ICollection<ReviewDto>? Reviews { get; set; }

    }
}
