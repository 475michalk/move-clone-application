using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entity
{
    public class PaypalDto
    {
     
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int NumberCard { get; set; }
        public string Validity { get; set; }
        public int Cvc { get; set; }
        public int Price { get; set; }
        public int IdentityCard { get; set; }//ת.ז.


    }
}
