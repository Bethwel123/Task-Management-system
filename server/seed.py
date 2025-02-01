from app import app, db
from models.task import Task
from models.priority import Priority
from datetime import datetime

def seed_database():
    with app.app_context():
        db.drop_all()
        db.create_all()

        priorities = [
            Priority(level='high', color='#dc3545'),
            Priority(level='medium', color='#ffc107'),
            Priority(level='low', color='#28a745')
        ]
        db.session.add_all(priorities)

        tasks = [
            Task(
                title='Complete Project Proposal',
                description='Draft and finalize the Q4 project proposal for client review',
                priority='high',
                category='Work',
                completed=True,
                due_date=datetime(2024, 2, 15),
                created_at=datetime(2024, 1, 20, 10)
            ),
            Task(
                title='Grocery Shopping',
                description='Buy fruits, vegetables, and weekly essentials',
                priority='medium',
                category='Personal',
                completed=False,
                due_date=datetime(2024, 1, 21),
                created_at=datetime(2024, 1, 19, 15, 30)
            ),
            Task(
                title='Team Meeting',
                description='Weekly sync with development team',
                priority='high',
                category='Work',
                completed=False,
                due_date=datetime(2024, 1, 22),
                created_at=datetime(2024, 1, 18, 9)
            ),
            Task(
                title='Gym Session',
                description='Cardio and strength training',
                priority='low',
                category='Health',
                completed=False,
                due_date=datetime(2024, 1, 21),
                created_at=datetime(2024, 1, 20, 8)
            ),
            Task(
                title='Code Review',
                description='Review pull requests for new features',
                priority='high',
                category='Work',
                completed=True,
                due_date=datetime(2024, 1, 23),
                created_at=datetime(2024, 1, 20, 11)
            )
        ]
        db.session.add_all(tasks)
        db.session.commit()
        print('Data seeded successfully')

if __name__ == '__main__':
    seed_database()
