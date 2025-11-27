package Campus_Vault_Backend.demo.Controller;

import Campus_Vault_Backend.demo.Module.PlacementQuestion;
import Campus_Vault_Backend.demo.Service.PlacementQuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
public class PlacementQuestionController {

    @Autowired
    private PlacementQuestionService service;

    @PostMapping("/upload")
    public PlacementQuestion uploadQuestion(@RequestBody PlacementQuestion question) {
        return service.save(question);
    }

    @GetMapping("/all")
    public List<PlacementQuestion> getAllQuestions() {
        return service.getAll();
    }

 
}
