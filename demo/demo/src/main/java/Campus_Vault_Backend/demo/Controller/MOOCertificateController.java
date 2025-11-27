package Campus_Vault_Backend.demo.Controller;

import Campus_Vault_Backend.demo.Module.MOOCertificate;
import Campus_Vault_Backend.demo.Service.MOOCertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mooc")
@CrossOrigin(origins = "*")
public class MOOCertificateController {

    @Autowired
    private MOOCertificateService service;

    @PostMapping("/upload")
    public MOOCertificate uploadCertificate(@RequestBody MOOCertificate certificate) {
        return service.save(certificate);
    }

    @GetMapping("/all")
    public List<MOOCertificate> getAllCertificates() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public MOOCertificate getCertificate(@PathVariable String id) {
        return service.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCertificate(@PathVariable String id) {
        service.delete(id);
    }
}
