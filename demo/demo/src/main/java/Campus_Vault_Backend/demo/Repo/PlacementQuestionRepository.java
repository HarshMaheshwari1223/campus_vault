package Campus_Vault_Backend.demo.Repo;

import Campus_Vault_Backend.demo.Module.PlacementQuestion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlacementQuestionRepository extends MongoRepository<PlacementQuestion, String> {
}
