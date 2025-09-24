package com.ganesh.firstjobapp.job;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping("/jobs")
    public List<Job> findAll() {
        return jobService.findAll();
    }

    @PostMapping("/jobsPost")
    public String createJob(@RequestBody Job job) {
        jobService.createJob(job);
        return "Job added successfully";
    }

    @GetMapping("/searchJob")
    public ResponseEntity<?> getJobsByTitle(@RequestParam String title) {
        List<Job> jobs = jobService.getJobsByTitle(title);
        if (!jobs.isEmpty()) {
            return ResponseEntity.ok(jobs);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No jobs found with title: " + title);
        }
    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<?> getJob(@PathVariable Long id) {
//        Job job = jobService.getJobById(id);
//        if (job != null) {
//            return ResponseEntity.ok(job);
//        } else {
//            Map<String, String> response = new HashMap<>();
//            response.put("message", "Job not found with ID: " + id);
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
//        }
//    }

    @DeleteMapping("/deleteJob/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id) {
        boolean deleted = jobService.deleteJobById(id);
        if (deleted) {
            return ResponseEntity.ok("Job with ID " + id + " successfully deleted");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Job with ID " + id + " not found");
        }
    }

    @PutMapping("/updateJob/{id}")
    public ResponseEntity<String> updateJob(@PathVariable Long id, @RequestBody Job updatedJob) {
        boolean updated = jobService.updateJobById(id, updatedJob);
        if (updated) {
            return ResponseEntity.ok("Job with ID " + id + " successfully updated");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Job with ID " + id + " not found");
        }
    }
}
