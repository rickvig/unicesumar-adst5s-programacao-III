-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema petshop_der
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema petshop_der
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `petshop_der` DEFAULT CHARACTER SET utf8 ;
USE `petshop_der` ;

-- -----------------------------------------------------
-- Table `petshop_der`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petshop_der`.`cliente` (
  `id_cliente` INT NOT NULL,
  `nome` VARCHAR(255) NULL,
  `email` VARCHAR(45) NULL,
  `cpf` INT NULL,
  `sobrenome` VARCHAR(255) NULL,
  PRIMARY KEY (`id_cliente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petshop_der`.`fornecedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petshop_der`.`fornecedor` (
  `id_fornecedor` INT NOT NULL,
  `nome` VARCHAR(255) NULL,
  `email` VARCHAR(45) NULL,
  `cnpj` INT NULL,
  `nome_fantasia` VARCHAR(255) NULL,
  PRIMARY KEY (`id_fornecedor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petshop_der`.`endereco`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petshop_der`.`endereco` (
  `idendereco` INT NOT NULL,
  `cep` INT NULL,
  `rua` VARCHAR(255) NULL,
  `numero` INT NULL,
  `bairro` VARCHAR(45) NULL,
  `cidade` VARCHAR(45) NULL,
  `uf` VARCHAR(2) NULL,
  `cliente_id_cliente` INT NOT NULL,
  `fornecedor_id_fornecedor` INT NOT NULL,
  PRIMARY KEY (`idendereco`),
  INDEX `fk_endereco_cliente_idx` (`cliente_id_cliente` ASC),
  INDEX `fk_endereco_fornecedor1_idx` (`fornecedor_id_fornecedor` ASC),
  CONSTRAINT `fk_endereco_cliente`
    FOREIGN KEY (`cliente_id_cliente`)
    REFERENCES `petshop_der`.`cliente` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_endereco_fornecedor1`
    FOREIGN KEY (`fornecedor_id_fornecedor`)
    REFERENCES `petshop_der`.`fornecedor` (`id_fornecedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `petshop_der`.`telefone`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `petshop_der`.`telefone` (
  `id_telefone` INT NOT NULL,
  `ddi` INT NULL,
  `ddd` INT NULL,
  `numero` INT NULL,
  `cliente_id_cliente` INT NOT NULL,
  `fornecedor_id_fornecedor` INT NOT NULL,
  PRIMARY KEY (`id_telefone`),
  INDEX `fk_telefone_cliente1_idx` (`cliente_id_cliente` ASC),
  INDEX `fk_telefone_fornecedor1_idx` (`fornecedor_id_fornecedor` ASC),
  CONSTRAINT `fk_telefone_cliente1`
    FOREIGN KEY (`cliente_id_cliente`)
    REFERENCES `petshop_der`.`cliente` (`id_cliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_telefone_fornecedor1`
    FOREIGN KEY (`fornecedor_id_fornecedor`)
    REFERENCES `petshop_der`.`fornecedor` (`id_fornecedor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
