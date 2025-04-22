package tn.esprit.forum.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseData {

    private String fileName;

    private String downloadURL;

    private String fileType;

    private long fileSize;
}
