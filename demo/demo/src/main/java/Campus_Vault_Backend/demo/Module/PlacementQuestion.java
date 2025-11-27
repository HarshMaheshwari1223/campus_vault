package Campus_Vault_Backend.demo.Module;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "placement_questions")
public class PlacementQuestion {

    @Id
    private String id;
    private String companyName;
    private String type;
    private String questionText;


    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompany(String companyName) {
        this.companyName = companyName;
    }

    public String getQuestiontext() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
