package model;

import entity.Model;

/**
 * Created by Влад on 08.04.2017.
 */
public interface ModelService {
    Model findModel(long id);

    long addModel(Model model);
}
