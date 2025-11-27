package Campus_Vault_Backend.demo.Repo;

import Campus_Vault_Backend.demo.Module.GeneralCertificate;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GeneralCertificateRepository extends MongoRepository<GeneralCertificate, String> {
}
