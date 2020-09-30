package me.abbah.web.rest.vm;

import java.time.LocalDate;

public class PointPerWeek {
    private LocalDate week;
    private Integer points;

    public PointPerWeek(LocalDate week, Integer points) {
        this.week = week;
        this.points = points;
    }

    public LocalDate getWeek() {
        return week;
    }

    public void setWeek(LocalDate week) {
        this.week = week;
    }

    @Override
    public String toString() {
        return String.format("PointPerWeek{week=%s, points=%d}", week, points);
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }
}
