package tn.esprit.forum.configs;


import io.minio.*;
import io.minio.errors.*;
import io.minio.http.Method;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.TimeUnit;

@RestController
@RequiredArgsConstructor
@RequestMapping("/minio")
public class MinioController {
    private final MinioService minioService;
    private final MinioClient minioClient;

    @PostMapping("/upload")
    public ResponseEntity<Void> uploadFile(@RequestParam String bucketName, @RequestParam String objectName, @RequestParam("file") MultipartFile file) throws MinioException, IOException, NoSuchAlgorithmException, InvalidKeyException {
        InputStream inputStream = file.getInputStream();
        minioService.uploadFile(bucketName, objectName, inputStream, file.getContentType());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/download")
    public ResponseEntity<InputStreamResource> downloadFileApi(@RequestParam String objectName, @RequestParam String bucketName) throws MinioException, IOException, NoSuchAlgorithmException, InvalidKeyException {
        byte[] data;
        StatObjectResponse objRes;
        try (InputStream stream = minioClient.getObject(GetObjectArgs.builder().bucket(bucketName).object(objectName).build())) {
            data = stream.readAllBytes();
            objRes = minioClient.statObject(StatObjectArgs.builder().bucket(bucketName).object(objectName).build());
        }
        InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(data));
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=\"" + objRes.object() + "\"");
        headers.add("Content-Type", objRes.contentType());
        return ResponseEntity.ok().headers(headers).contentLength(data.length).body(resource);

    }

    @GetMapping("/getPresignedUrl")
    public String getPresignedUrl(@RequestParam String filePath) throws Exception {
        String bucket = filePath.split("_")[0];
        String objectName = filePath.split("_")[1];
        System.out.printf("bucket: %s, objectName: %s\n", bucket, objectName);
        GetPresignedObjectUrlArgs gp = null ;
        try {
            gp = GetPresignedObjectUrlArgs.builder()
                    .bucket(bucket)
                    .object(objectName)
                    .expiry(5, TimeUnit.MINUTES)
                    .method(Method.GET)
                    .build();
        }
        catch (Exception e) {
            throw new IllegalArgumentException("error args");
        }
        return minioClient.getPresignedObjectUrl(gp);
    }

}
