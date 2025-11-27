package Campus_Vault_Backend.demo.Service;

import Campus_Vault_Backend.demo.Module.GeneralCertificate;
import Campus_Vault_Backend.demo.Repo.GeneralCertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GeneralCertificateService {

    @Autowired
    private GeneralCertificateRepository repository;

    public GeneralCertificate save(GeneralCertificate certificate) {
        return repository.save(certificate);
    }

    public List<GeneralCertificate> getAll() {
        return repository.findAll();
    }

    public GeneralCertificate getById(String id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
}
