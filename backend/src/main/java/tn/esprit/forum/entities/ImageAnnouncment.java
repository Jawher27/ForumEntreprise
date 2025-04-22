package tn.esprit.forum.entities;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Data
public class ImageAnnouncment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    Long id;

    String name;
    String Type;
    @Lob
    @Basic(fetch = FetchType.LAZY)
    byte[] picByte;

    @OneToOne
    private Announcement announcement;

    public ImageAnnouncment(String name, String type, byte[] picByte) {
        this.name = name;
        this.Type = type;
        this.picByte = picByte;
    }



}
