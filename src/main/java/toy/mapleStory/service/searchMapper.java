package toy.mapleStory.service;

import org.apache.ibatis.annotations.Mapper;
import toy.mapleStory.vo.checkVO;

@Mapper
public interface searchMapper {
//    public List<checkVO> totalList();

    public int checkId(String name);

    public void insertData(checkVO checkVO);

    public void updateData(checkVO checkVO);
}
