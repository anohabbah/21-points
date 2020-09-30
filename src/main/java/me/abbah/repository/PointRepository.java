package me.abbah.repository;

import me.abbah.domain.Point;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Point entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PointRepository extends JpaRepository<Point, Long> {

    @Query("select point from Point point where point.user.login = ?#{principal.username} order by points.date")
    Page<Point> findByUserIsCurrentUser(Pageable pageable);

    Page<Point> findAllByOrderByDateDesc(Pageable pageable);
}
