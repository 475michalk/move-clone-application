using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
   
    public class Drivers
    {
        
        [Key]
        public int Id { get; set; }
        public string NameDriver{ get; set; } //שם
        public string Status { get; set; } //סטטוס פנוי או לא בסיום הנסיעה נהג מעדכן
        public float Lat { get; set; } //מיקום
        public float Lng { get; set; }
        public string Email { get; set; } // שדה נוסף למייל
        public string Password { get; set; } 
        public string PhoneNumber { get; set; } // שדה נוסף לטלפון
                                                // public string? VerificationCode { get; set; }


        //לנהג יש הרבה דירוגים
        //public virtual ICollection<Ordering> Orders { get; set; }

        public virtual ICollection<Review>? Reviews { get; set; }


    }
}
