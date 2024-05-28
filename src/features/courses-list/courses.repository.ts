import { dbClient } from '@/shared/lib/db';
import { cache } from 'react';
import { cors } from '@/shared/api/cors';
import { NextApiRequest, NextApiResponse } from 'next';

class CoursesRepository {
  getCoursesList = cache(
    (): Promise<CourseListElement[]> => dbClient.course.findMany()
  );

  createCourseElement = (
    command: CreateCourseListElementCommand
  ): Promise<CourseListElement> => {
    return dbClient.course.create({
      data: command,
    });
  };

  deleteCourseElement = (command: DeleteCourseListElementCommand) => {
    console.log('Deleting ...');
    return dbClient.course.delete({
      where: { id: command.id },
    });
  };

  private handleAdd = async (req: NextApiRequest, res: NextApiResponse) => {
    const command: CreateCourseListElementCommand = req.body;
    try {
      const newCourse = await this.createCourseElement(command);
      res.status(201).json(newCourse);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occurred while creating the course' });
    }
  };

  private handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    const command: DeleteCourseListElementCommand = { id: req.body.id };
    try {
      await this.deleteCourseElement(command);
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'An error occurred while deleting the course' });
    }
  };

  handler = async (req: NextApiRequest, res: NextApiResponse) => {
    cors(req, res, async () => {
      if (req.method === 'POST') {
        if (req.body.operation === 'add') {
          await this.handleAdd(req, res);
        } else if (req.body.operation === 'delete') {
          await this.handleDelete(req, res);
        } else {
          res.status(400).json({ message: 'Invalid operation' });
        }
      } else {
        res.status(405).json({ message: 'Method not allowed' }); // Only POST method is allowed
      }
    });
  };
}

export const coursesRepository = new CoursesRepository();
