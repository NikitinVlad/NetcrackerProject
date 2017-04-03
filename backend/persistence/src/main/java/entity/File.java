package entity;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

/**
 * Created by Влад on 27.03.2017.
 */
@Entity
public class File extends BaseEntity{
    private String filename;
    @OneToOne(mappedBy = "file")
    private Poster poster;
    public File(){}

    public File(String filename, Poster poster) {
        this.filename = filename;
        this.poster = poster;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public Poster getPoster() {
        return poster;
    }

    public void setPoster(Poster poster) {
        this.poster = poster;
    }
}
