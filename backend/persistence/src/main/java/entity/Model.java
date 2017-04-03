package entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * Created by Влад on 24.03.2017.
 */
@Entity
public class Model extends BaseEntity {
    private String name;
    @ManyToOne
    @JoinColumn(name = "id_mark")
    private Mark mark;
    public Model(){
    }

    public Model(String name, Mark mark) {
        this.name = name;
        this.mark = mark;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Mark getMark() {
        return mark;
    }

    public void setMark(Mark mark) {
        this.mark = mark;
    }

}
