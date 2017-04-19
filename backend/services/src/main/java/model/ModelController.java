package model;

import entity.Model;
import mark.MarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ModelController {
    @Autowired
    ModelService modelService;

    @PreAuthorize("hasRole('ADMIN')")
    @RequestMapping(value = "/addModel", produces = "application/json", method = RequestMethod.POST)
    public long getModels(@RequestBody Model model) {
        return modelService.addModel(model);
    }
}
