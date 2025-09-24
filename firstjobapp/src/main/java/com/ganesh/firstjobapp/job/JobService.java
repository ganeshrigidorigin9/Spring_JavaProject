package com.ganesh.firstjobapp.job;

import java.util.List;

public interface JobService {

    List<Job> findAll();

    void createJob(Job job);

    List<Job> getJobsByTitle(String title); // For search by title

    //Job getJobById(Long id); // For fetch by ID

    boolean deleteJobById(Long id);

    boolean updateJobById(Long id, Job updatedJob);
}
