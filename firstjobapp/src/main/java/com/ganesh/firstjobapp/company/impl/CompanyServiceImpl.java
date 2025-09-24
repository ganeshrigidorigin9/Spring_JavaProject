package com.ganesh.firstjobapp.company.impl;
import com.ganesh.firstjobapp.company.Company;
import com.ganesh.firstjobapp.company.CompanyRepository;
import com.ganesh.firstjobapp.company.CompanyService;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CompanyServiceImpl implements CompanyService {
    List<Company> companies=new ArrayList<>();

    public CompanyRepository companyRepository;

    public CompanyServiceImpl( CompanyRepository companyRepository)
    {
        this.companyRepository=companyRepository;
    }

    public List<Company>getAllCompanies()
    {
        return companyRepository.findAll();

    }

    @Override
    public void createCompany(Company company) {
        companyRepository.save(company);
    }

    @Override
    public Company getCompanyById(Long id) {

        return companyRepository.findById(id).orElse(null);
    }

    public boolean updateCompany(Long id, Company updatedCompany) {
        Optional<Company> optionalExistingCompany = companyRepository.findById(id);
        if (optionalExistingCompany.isEmpty()) return false;

        Company existingCompany = optionalExistingCompany.get();

        // Update only the fields that are not null
        if (updatedCompany.getName() != null) existingCompany.setName(updatedCompany.getName());
        if (updatedCompany.getDescription() != null) existingCompany.setDescription(updatedCompany.getDescription());
        // Add more fields if needed

        companyRepository.save(existingCompany);
        return true;
    }

    @Override
    public boolean deleteCompany(Long id) {
        if(companyRepository.existsById(id))
        {
            companyRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
