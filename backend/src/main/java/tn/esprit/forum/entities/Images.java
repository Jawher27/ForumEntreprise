package tn.esprit.forum.entities;



import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.Optional;


@Entity
@Table(name = "Images")
@NoArgsConstructor

@AllArgsConstructor

public class Images {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String name;

    private String type;




    @Lob
    private byte[] data;

    @ManyToOne
    @JoinColumn(name = "uploader_id")
    private User uploader;


    public Images(String name, String type, byte[] data) {
        super();
        this.name = name;
        this.type = type;
        this.data = data;



    }

    public User getUploader() {
        return uploader;
    }

    public void setUploader(User uploader) {
        this.uploader = uploader;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Images{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", data=" + Arrays.toString(data) +
                '}';
    }
}