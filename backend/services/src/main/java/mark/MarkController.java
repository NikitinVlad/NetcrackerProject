package mark;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Влад on 07.04.2017.
 */
@RestController
public class MarkController {
    @Autowired
    MarkService markService;

    @RequestMapping(value = "/getModels",produces = "application/json", method = RequestMethod.POST)
    public @ResponseBody List getModels(@RequestBody String id){
        return markService.getMarkModels(Long.parseLong(id));
    }
}
