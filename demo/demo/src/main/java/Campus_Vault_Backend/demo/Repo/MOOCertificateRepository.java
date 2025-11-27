package Campus_Vault_Backend.demo.Repo;

import Campus_Vault_Backend.demo.Module.MOOCertificate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MOOCertificateRepository extends MongoRepository<MOOCertificate, String> {
}
