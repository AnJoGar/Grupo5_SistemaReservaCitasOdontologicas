using System.ComponentModel.DataAnnotations;

namespace SistemaOdontologico.Models
{
  public class MenuRol
  {
    [Key]
    public int Id { get; set; }
    public int? MenuId { get; set; }
    public int? RolId { get; set; }

    public  Menu? Menu { get; set; }
    public  Rol? Rol { get; set;  }

  }
}
