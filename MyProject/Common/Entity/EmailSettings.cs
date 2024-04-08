using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entity
{
    public class EmailSettings
    {
        public string FromAddress { get; set; } = "moveclone.app@gmail.com";
            public string FromName { get; set; } = "Move App";
            public string ToEmail { get; set; } // כתובת האימייל של הנמען
            public string CcEmail { get; set; } // כתובת האימייל להעתקה מוסתרת
            public string BccEmail { get; set; } // כתובת האימייל להעתקה מוסתרת
            public string ServerAddress { get; set; } = "smtp.gmail.com"; // כתובת שרת ה-SMTP
            public int ServerPort { get; set; } = 587; // פורט שרת ה-SMTP
            public string Username { get; set; } = "moveclone.app@gmail.com"; // שם המשתמש לגישה לשרת ה-SMTP
            public string Password { get; set; } = "move-application"; // סיסמה לגישה לשרת ה-SMTP
            public bool ServerUseSsl { get; set; } = true; // האם להשתמש ב-Ssl
      
    }
}
