package com.ganesh.firstjobapp.company;
import java.util.*;
public interface CompanyService {

    public List<Company>getAllCompanies();
    void createCompany(Company company);
    Company getCompanyById(Long id);
    boolean updateCompany(Long id,Company updatedCompany);
    boolean deleteCompany(Long id);

}
