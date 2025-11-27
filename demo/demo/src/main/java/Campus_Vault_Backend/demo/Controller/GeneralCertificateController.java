package Campus_Vault_Backend.demo.Controller;

import Campus_Vault_Backend.demo.Module.GeneralCertificate;
import Campus_Vault_Backend.demo.Service.GeneralCertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/general")
@CrossOrigin(origins = "*")
public class GeneralCertificateController {

    @Autowired
    private GeneralCertificateService service;

    @PostMapping("/upload")
    public GeneralCertificate uploadCertificate(@RequestBody GeneralCertificate certificate) {
        return service.save(certificate);
    }

    @GetMapping("/all")
    public List<GeneralCertificate> getAllCertificates() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public GeneralCertificate getCertificate(@PathVariable String id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCertificate(@PathVariable String id) {
        service.delete(id);
    }
}
