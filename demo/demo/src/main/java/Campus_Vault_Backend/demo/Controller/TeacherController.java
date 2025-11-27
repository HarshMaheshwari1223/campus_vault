//package Campus_Vault_Backend.demo.Controller;
//
//import Campus_Vault_Backend.demo.Module.GeneralCertificate;
//import Campus_Vault_Backend.demo.Module.MOOCertificate;
//import Campus_Vault_Backend.demo.Module.PlacementQuestion;
//import Campus_Vault_Backend.demo.Service.GeneralCertificateService;
//import Campus_Vault_Backend.demo.Service.MOOCertificateService;
//import Campus_Vault_Backend.demo.Service.PlacementQuestionService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/teacher")
//@CrossOrigin(origins = "*")
//public class TeacherController {
//
//    @Autowired
//    private GeneralCertificateService generalCertificateService;
//
//    @Autowired
//    private MOOCertificateService moocCertificateService;
//
//    @Autowired
//    private PlacementQuestionService placementQuestionService;
//
//    // View all general certificates
//    @GetMapping("/general-certificates")
//    public List<GeneralCertificate> getAllGeneralCertificates() {
//        return generalCertificateService.getAllCertificates();
//    }
//
//    // View all MOOC certificates
//    @GetMapping("/mooc-certificates")
//    public List<MOOCertificate> getAllMOOCertificates() {
//        return moocCertificateService.getAllCertificates();
//    }
//
//    // View all placement questions
//    @GetMapping("/placement-questions")
//    public List<PlacementQuestion> getAllPlacementQuestions() {
//        return placementQuestionService.getAllQuestions();
//    }
//}
