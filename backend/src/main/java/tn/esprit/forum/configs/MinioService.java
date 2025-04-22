package tn.esprit.forum.configs;
import io.minio.*;


import io.minio.errors.MinioException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class MinioService {


    private final MinioClient minioClient;

//    @Value("${minio.bucket}")
//    private String bucketName;
//    /**
//     * Upload un fichier vers MinIO.
//     *
//     * @param file     Le fichier à uploader.
//     * @param fileName Le nom du fichier dans MinIO.
//     * @return Le chemin du fichier dans MinIO.
//     */
//    public String uploadFile(MultipartFile file, String fileName) throws Exception {
//        try {
//        minioClient.putObject(
//                PutObjectArgs.builder()
//                        .bucket(bucketName)
//                        .object(fileName)
//                        .stream(file.getInputStream(), file.getSize(), -1)
//                        .contentType(file.getContentType())
//                        .build()
//        );
//        return fileName;
//        } catch (Exception e) {
//            throw new RuntimeException("Erreur d'upload vers MinIO: " + e.getMessage());
//        }
//    }
//
//    /**
//     * Télécharge un fichier depuis MinIO.
//     *
//     * @param fileName Le nom du fichier dans MinIO.
//     * @return Un InputStream pour lire le fichier.
//     */
//    public InputStream downloadFile(String fileName) throws Exception {
//        return minioClient.getObject(
//                GetObjectArgs.builder()
//                        .bucket(bucketName)
//                        .object(fileName)
//                        .build()
//        );
//    }
//
//    /**
//     * Supprime un fichier de MinIO.
//     *
//     * @param fileName Le nom du fichier à supprimer.
//     */
//    public void deleteFile(String fileName) throws Exception {
//        minioClient.removeObject(
//                RemoveObjectArgs.builder()
//                        .bucket(bucketName)
//                        .object(fileName)
//                        .build()
//        );
//    }

    public void uploadFile(String bucketName, String objectName, InputStream inputStream, String contentType) throws MinioException, IOException, NoSuchAlgorithmException, InvalidKeyException {
        // Check bucket existence before creating on every upload (cache existence if needed)
        if (!minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build())) {
            minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
        }
        minioClient.putObject(PutObjectArgs.builder().bucket(bucketName).object(objectName).stream(inputStream, inputStream.available(), -1).contentType(contentType).build());
    }

    public InputStream downloadFile(String bucketName, String objectName) throws MinioException, IOException, NoSuchAlgorithmException, InvalidKeyException {
        return minioClient.getObject(GetObjectArgs.builder().bucket(bucketName).object(objectName).build());
    }
}
