using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace SecretAgency.Controllers
{
    [ApiController]
    [Route("/api/mission-report")]
    public class MissionReportController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;

        public MissionReportController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }
        
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<MissionReport> CreateMissionReport(MissionReport report)
        {
            return new OkObjectResult(report);
        }
    }

    public class MissionReport
    {
        public Guid Id { get; init; }
        public string TwitterHandle { get; init; }
        public string FieldNotes { get; init; }
        public string Passcode { get; init; }
        public int TimesCompleted { get; init; }
        public string MissionId { get; init; }

        public MissionReport()
        {
            Id = Guid.NewGuid(); 
        }
    }
}
