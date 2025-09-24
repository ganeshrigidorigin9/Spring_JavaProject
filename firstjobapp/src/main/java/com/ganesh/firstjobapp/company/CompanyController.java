package com.ganesh.firstjobapp.company;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:5175")
@RestController
@RequestMapping("/companies")
public class CompanyController {
    CompanyService companyService;
    public CompanyController(CompanyService companyService)
    {
        this.companyService=companyService;

    }

    @GetMapping
    public List<Company> getAllCompanies()
    {
        return companyService.getAllCompanies();

    }

    @PostMapping("/companyPost")
    public String createCompany(@RequestBody Company company)
    {
        companyService.createCompany(company);
        return "Company added successfully";
    }

    @GetMapping("/{id}")
    public ResponseEntity getCompanyById(@PathVariable Long id)
    {
       Company company=companyService.getCompanyById(id);
        if(company!=null)
        {
            return ResponseEntity.ok(company);
        }
        else
        {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Company not found with ID: " + id);
            return ResponseEntity.status(404).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCompany(@PathVariable Long id,@RequestBody Company updatedCompany) {
        boolean updated = companyService.updateCompany(id, updatedCompany);

        if (updated) {
            return ResponseEntity.ok("Company with ID " + id + " is successfully updated.");
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Company with ID " + id + " not found.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String>deleteCompany(@PathVariable Long id) {
        boolean deleted = companyService.deleteCompany(id);
        if (deleted) {
            return ResponseEntity.ok("Company with ID " + id + " is successfully deleted.");
        } else {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Company with ID " + id + " not found to delete.");
        }
    }
}
