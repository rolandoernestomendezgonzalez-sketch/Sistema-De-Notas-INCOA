from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = "usuarios"
    id            = db.Column(db.Integer, primary_key=True)
    nombre        = db.Column(db.String(120), nullable=False)
    codigo        = db.Column(db.String(20), unique=True, nullable=False)
    rol           = db.Column(db.String(20), nullable=False)   # estudiante | maestro | admin
    password_hash = db.Column(db.String(256), nullable=False)
    activo        = db.Column(db.Boolean, default=True)

class Materia(db.Model):
    __tablename__ = "materias"
    id         = db.Column(db.Integer, primary_key=True)
    nombre     = db.Column(db.String(80), nullable=False)
    maestro_id = db.Column(db.Integer, db.ForeignKey("usuarios.id"), nullable=True)

class Periodo(db.Model):
    __tablename__ = "periodos"
    id     = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(40), nullable=False)
    activo = db.Column(db.Boolean, default=False)

class Nota(db.Model):
    __tablename__  = "notas"
    id             = db.Column(db.Integer, primary_key=True)
    estudiante_id  = db.Column(db.Integer, db.ForeignKey("usuarios.id"), nullable=False)
    materia_id     = db.Column(db.Integer, db.ForeignKey("materias.id"), nullable=False)
    periodo_id     = db.Column(db.Integer, db.ForeignKey("periodos.id"), nullable=False)
    valor          = db.Column(db.Float, nullable=False)
    __table_args__ = (db.UniqueConstraint("estudiante_id","materia_id","periodo_id"),)
