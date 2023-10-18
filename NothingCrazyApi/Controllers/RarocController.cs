using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NothingCrazyApi.Models;

namespace NothingCrazyApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RarocDataController : ControllerBase
    {
        public List<RarocData> RarocData = new List<RarocData>
        {
            new RarocData { Segment = "Retail Banking", ExpectedReturn = 200, EconomicCapital = 1000, Raroc = 20 },
            new RarocData { Segment = "Commercial Lending", ExpectedReturn = 250, EconomicCapital = 1250, Raroc = 20 },
            new RarocData { Segment = "Investment Banking", ExpectedReturn = 300, EconomicCapital = 1500, Raroc = 20 },
            new RarocData { Segment = "Asset Management", ExpectedReturn = 150, EconomicCapital = 750, Raroc = 20 },
            new RarocData { Segment = "Credit Card Services", ExpectedReturn = 180, EconomicCapital = 900, Raroc = 20 },
        };

        private readonly ILogger<RarocDataController> _logger;

        public RarocDataController(ILogger<RarocDataController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetRarocData")]
        public IEnumerable<RarocData> GetRarocData()
        {
            return RarocData;
        }
    }
}
