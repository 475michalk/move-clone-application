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
    public class Review
    {
        [Key]
        public int Id { get; set; }

        public int OrderId { get; set; }
        [ForeignKey("OrderId")]
        public virtual Ordering? Ordering { get; set; }

        public int UserId { get; set; }
       
        public int DriverId { get; set; }
        
        public string Date { get; set; }
        public int Rating { get; set; }  //דירוג
        public string Comment { get; set; } //הערות 



    }
}
