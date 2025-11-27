package Campus_Vault_Backend.demo.Service;

import Campus_Vault_Backend.demo.Module.MOOCertificate;
import Campus_Vault_Backend.demo.Repo.MOOCertificateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MOOCertificateService {

    @Autowired
    private MOOCertificateRepository repository;

    public MOOCertificate save(MOOCertificate certificate) {
        return repository.save(certificate);
    }

    public List<MOOCertificate> getAll() {
        return repository.findAll();
    }

    public MOOCertificate getById(String id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
}
