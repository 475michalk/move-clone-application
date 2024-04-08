using Common.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Ordering
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; } // מפתח זר עבור המשתמש
        [ForeignKey("UserId")]
        public virtual Users Users { get; set; }

        public int DriverId { get; set; } // מפתח זר עבור הנהג
        [ForeignKey("DriverId")]
        public virtual Drivers Drivers { get; set; }
        public string Status { get; set; }
        public string ChoiseCar { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public string DriveTime { get; set; }


        //public int ReviewId { get; set; } 
        //[ForeignKey("ReviewId")]
        //public virtual Review? Review { get; set; }
        //public virtual Users User { get; set; }

        // public virtual Drivers Driver { get; set; }
       
       // public virtual Review Review { get; set; }
     


    }
}
