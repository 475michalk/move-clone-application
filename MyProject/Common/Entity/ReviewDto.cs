using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entity
{
    public class ReviewDto
    {
        public int Id { get; set; }

        public int OrderId { get; set; } 
        //public virtual OrderingDto? Ordering { get; set; }

        public int UserId { get; set; }
        public int DriverId { get; set; }
        public string Date { get; set; }
        public int Rating { get; set; }  //דירוג
        public string Comment { get; set; } //הערות 


       

        //   public virtual OrderingDto? Ordering { get; set; }

    }
}
