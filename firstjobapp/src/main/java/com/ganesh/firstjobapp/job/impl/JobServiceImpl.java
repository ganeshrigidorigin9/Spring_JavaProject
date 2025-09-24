package com.ganesh.firstjobapp.job.impl;

import com.ganesh.firstjobapp.company.Company;
import com.ganesh.firstjobapp.company.CompanyRepository;
import com.ganesh.firstjobapp.job.Job;
import com.ganesh.firstjobapp.job.JobRepository;
import com.ganesh.firstjobapp.job.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private JobRepository jobRepository;

    public JobServiceImpl(CompanyRepository companyRepository, JobRepository jobRepository) {
        this.companyRepository = companyRepository;
        this.jobRepository = jobRepository;
    }

    @Override
    public List<Job> findAll() {
        return jobRepository.findAll();
    }

    @Override
    public void createJob(Job jobRequest) {
        Long companyId = jobRequest.getCompany().getId();

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new RuntimeException("Company with ID " + companyId + " not found"));

        jobRequest.setCompany(company); // Set the full persistent object

        jobRepository.save(jobRequest);
    }

    @Override
    public List<Job> getJobsByTitle(String title) {
        return jobRepository.findByTitleContainsIgnoreCase(title);
    }

//    @Override
//    public Job getJobById(Long id) {
//        return jobRepository.findById(id).orElse(null);
//    }

    @Override
    public boolean deleteJobById(Long id) {
        if (jobRepository.existsById(id)) {
            jobRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean updateJobById(Long id, Job updatedJob) {
        Optional<Job> optionalExistingJob = jobRepository.findById(id);
        if (optionalExistingJob.isEmpty()) return false;

        Job existingJob = optionalExistingJob.get();

        if (updatedJob.getTitle() != null) existingJob.setTitle(updatedJob.getTitle());
        if (updatedJob.getDescription() != null) existingJob.setDescription(updatedJob.getDescription());
        if (updatedJob.getLocation() != null) existingJob.setLocation(updatedJob.getLocation());
        if (updatedJob.getMinSalary() != null) existingJob.setMinSalary(updatedJob.getMinSalary());
        if (updatedJob.getMaxSalary() != null) existingJob.setMaxSalary(updatedJob.getMaxSalary());

        if (updatedJob.getCompany() != null && updatedJob.getCompany().getId() != null) {
            // Optionally fetch the company from DB to ensure it exists
            Optional<Company> companyOpt = companyRepository.findById(updatedJob.getCompany().getId());
            companyOpt.ifPresent(existingJob::setCompany);
        }

        jobRepository.save(existingJob);
        return true;
    }
}
