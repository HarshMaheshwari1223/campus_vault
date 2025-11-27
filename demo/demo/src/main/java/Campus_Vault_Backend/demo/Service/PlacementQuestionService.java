package Campus_Vault_Backend.demo.Service;

import Campus_Vault_Backend.demo.Module.PlacementQuestion;
import Campus_Vault_Backend.demo.Repo.PlacementQuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlacementQuestionService {

    @Autowired
    private PlacementQuestionRepository repository;

    public PlacementQuestion save(PlacementQuestion question) {
        return repository.save(question);
    }

    public List<PlacementQuestion> getAll() {
        return repository.findAll();
    }

}
